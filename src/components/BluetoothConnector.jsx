import React from 'react';
import { encryptAES, decryptAES } from '../utils/aes';

const SERVICE_UUID = '0000ffe0-0000-1000-8000-00805f9b34fb';
const CHARACTERISTIC_UUID = '0000ffe1-0000-1000-8000-00805f9b34fb';

export default function BluetoothConnector({ addMessage, setSendMessage, isEncrypted }) {
  const handleConnect = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [SERVICE_UUID] }],
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService(SERVICE_UUID);
      const characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);

      addMessage('System', `✅ Connected to ${device.name}`);

      characteristic.startNotifications();
      characteristic.addEventListener('characteristicvaluechanged', (event) => {
        const value = new TextDecoder().decode(event.target.value);
        if (value) {
          let decrypted = value;
          try {
            decrypted = isEncrypted ? decryptAES(value) : value;
          } catch (err) {
            decrypted = '[Decryption Failed]';
          }
          addMessage('Device', decrypted + (isEncrypted ? ' 🔐' : ''));
        }
      });

      setSendMessage(() => async (text) => {
        let outgoing = text;
        if (isEncrypted) {
          outgoing = encryptAES(text);
        }
        const data = new TextEncoder().encode(outgoing);
        await characteristic.writeValue(data);
      });
    } catch (err) {
      console.error('Bluetooth error:', err);
      addMessage('Error', err.message);
    }
  };

  return (
    <button
      onClick={handleConnect}
      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white mb-4"
    >
      🔌 Connect to Bluetooth
    </button>
  );
}
