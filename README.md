RFID_Project

add to MFRC522.cpp and add header in MFRC522.h

String MFRC522::PICC_DumpUID(Uid \*uid) {
// UID
Serial.print(F("Card UID:"));
String uidd = "";
for (byte i = 0; i < uid->size; i++) {
if(uid->uidByte[i] < 0x10)
Serial.print(F(" 0"));
else
Serial.print(F(" "));
Serial.print(uid->uidByte[i], HEX);
uidd += uid->uidByte[i] ;
}
Serial.println();
return uidd;

}
