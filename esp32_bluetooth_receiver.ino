#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <AESLib.h>

AESLib aesLib;

// 32-byte AES key (must match React side)
const char *aes_key = "12345678901234567890123456789012";

// BLE Service and Characteristic UUIDs (same as frontend)
#define SERVICE_UUID        "0000ffe0-0000-1000-8000-00805f9b34fb"
#define CHARACTERISTIC_UUID "0000ffe1-0000-1000-8000-00805f9b34fb"

BLECharacteristic *pCharacteristic;

void setup() {
  Serial.begin(115200);
  Serial.println("Starting BLE work...");

  BLEDevice::init("ESP32-BT-Chat");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);

  pCharacteristic = pService->createCharacteristic(
                      CHARACTERISTIC_UUID,
                      BLECharacteristic::PROPERTY_WRITE |
                      BLECharacteristic::PROPERTY_NOTIFY
                    );

  pCharacteristic->setCallbacks(new BLECharacteristicCallbacksImpl());
  pService->start();

  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->start();

  Serial.println("BLE ready. Waiting for messages...");
}

// AES decrypt function
String decryptMessage(String encryptedB64) {
  int inputLength = encryptedB64.length();
  char encrypted[inputLength + 1];
  encryptedB64.toCharArray(encrypted, inputLength + 1);

  // Buffer for decrypted data
  char decrypted[256];
  int decryptedLength = aesLib.decrypt64(encrypted, decrypted, aes_key, 256);
  decrypted[decryptedLength] = '\0';  // Ensure null termination

  return String(decrypted);
}

// BLE callback
class BLECharacteristicCallbacksImpl : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pChar) {
    std::string rxValue = pChar->getValue();
    if (rxValue.length() > 0) {
      String encrypted = String(rxValue.c_str());
      Serial.println("🔒 Encrypted message received:");
      Serial.println(encrypted);

      String decrypted = decryptMessage(encrypted);
      Serial.println("🔓 Decrypted message:");
      Serial.println(decrypted);
    }
  }
};

void loop() {
  // Nothing to do here
}