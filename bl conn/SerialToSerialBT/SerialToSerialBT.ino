//This example code is in the Public Domain (or CC0 licensed, at your option.)
//By Evandro Copercini - 2018
//
//This example creates a bridge between Serial and Classical Bluetooth (SPP)
//and also demonstrate that SerialBT have the same functionalities of a normal Serial

#include "BluetoothSerial.h"
#include <SPI.h>
#include <MFRC522.h>

constexpr uint8_t RST_PIN = 22; // Configurable, see typical pin layout above
constexpr uint8_t SS_PIN = 5;   // Configurable, see typical pin layout above

MFRC522 rfid(SS_PIN, RST_PIN);

#if !defined(CONFIG_BT_ENABLED) || !defined(CONFIG_BLUEDROID_ENABLED)
#error Bluetooth is not enabled! Please run `make menuconfig` to and enable it
#endif

BluetoothSerial SerialBT;

void printHex(byte *buffer, byte bufferSize)
{
  for (byte i = 0; i < bufferSize; i++)
  {
    SerialBT.print(buffer[i] < 0x10 ? "0" : "");
    SerialBT.print(buffer[i], HEX);
  }
  SerialBT.print("\n");
}

void setup()
{
  Serial.begin(115200);
  SerialBT.begin("ESP32"); //Bluetooth device name
  Serial.println("The device started, now you can pair it with bluetooth!");

  SPI.begin(); // Init SPI bus
  rfid.PCD_Init();
}

void loop()
{
  // Look for new cards
  if (!rfid.PICC_IsNewCardPresent())
    return;

  // Verify if the NUID has been readed
  if (!rfid.PICC_ReadCardSerial())
    return;

  printHex(rfid.uid.uidByte, rfid.uid.size);
  delay(3000);
}
