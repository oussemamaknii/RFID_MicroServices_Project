
/**
   Created by K. Suwatchai (Mobizt)

   Email: k_suwatchai@hotmail.com

   Github: https://github.com/mobizt

   Copyright (c) 2021 mobizt

*/
#include <ESP32Servo.h>
#include <LiquidCrystal_I2C.h>
Servo myservo;  // create servo object to control a servo
// 16 servo objects can be created on the ESP32

int pos = 0;    // variable to store the servo position
// Recommended PWM GPIO pins on the ESP32 include 2,4,12-19,21-23,25-27,32-33
int servoPin = 15;


// set the LCD number of columns and rows
int lcdColumns = 16;
int lcdRows = 2;

LiquidCrystal_I2C lcd(0x3F, lcdColumns, lcdRows);
//This example shows how to get a document from a document collection. This operation requiRED Email/password, custom or OAUth2.0 authentication.
#include <SPI.h>
#include <MFRC522.h>
#include <String.h>



#define SS_PIN    5  // ESP32 pin GIOP5 
#define RST_PIN   27 // ESP32 pin GIOP27 

#define GREEN 4
#define RED 2
#define BUZZER 14
#define ADMIN 25



MFRC522 rfid(SS_PIN, RST_PIN);


#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>

//Provide the token generation process info.
#include <addons/TokenHelper.h>

/* 1. Define the WiFi cREDentials */
#define WIFI_SSID "ESPRIT"
#define WIFI_PASSWORD "1234567899"

/* 2. Define the API Key */
#define API_KEY "AIzaSyBfg3lGLSwuMc1XWNCtamdt48zhMFQnIHk"

/* 3. Define the project ID */
#define FIREBASE_PROJECT_ID "weather-derbel"

/* 4. Define the user Email and password that alreadey registerd or added in your project */
#define USER_EMAIL ""
#define USER_PASSWORD ""

const int trigPin = 32;
const int echoPin = 35;

byte Heart[8] = {
  0b00000,
  0b01010,
  0b11111,
  0b11111,
  0b01110,
  0b00100,
  0b00000,
  0b00000
};

//define sound speed in cm/uS
#define SOUND_SPEED 0.034

int welcome;
int adminopen;
long duration;
float distanceCm;

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

bool taskCompleted = false;

unsigned long dataMillis = 0;

void setup()
{
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input


  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  ESP32PWM::allocateTimer(2);
  ESP32PWM::allocateTimer(3);
  myservo.setPeriodHertz(50);    // standard 50 hz servo
  myservo.attach(servoPin, 1000, 2000);


  // initialize LCD
  lcd.init();
  // turn on LCD backlight
  lcd.backlight();
  lcd.createChar(0, Heart);

  Serial.begin(9600);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    lcd.setCursor(0, 0);
    // print message
    lcd.print("WIFI CONNECT.");
    delay(300);
    lcd.clear();
    lcd.print("WIFI CONNECT..");
    delay(300);
    lcd.clear();
    lcd.print("WIFI CONNECT...");
    delay(300);
    lcd.clear();

    //   Serial.print(".");
    //  delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  lcd.setCursor(0, 0);
  lcd.print("CONNECTED IP:");
  lcd.setCursor(0, 1);
  lcd.print(WiFi.localIP());


  Serial.println(WiFi.localIP());
  Serial.println();

  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  /* Assign the api key (requiRED) */
  config.api_key = API_KEY;

  /* Assign the user sign in cREDentials */
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

  Firebase.begin(&config, &auth);

  Firebase.reconnectWiFi(true);

  SPI.begin(); // init SPI bus
  rfid.PCD_Init(); // init MFRC522

  pinMode(RED, OUTPUT);
  pinMode(GREEN, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  pinMode(ADMIN, INPUT);

  digitalWrite(RED, LOW);
  digitalWrite(GREEN, LOW);
  digitalWrite(BUZZER, LOW);

  Serial.println("Tap RFID/NFC Tag on reader");
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("FIREBASE");
  lcd.setCursor(7, 1);
  lcd.print("CONNECTED");
  delay(3000);


  welcome = 0;
  adminopen = 0;

}

void loop()
{
  if (welcome == 0 && adminopen == 0)
  {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("AXELIB WELCOME");
    lcd.setCursor(15, 0);
    lcd.write(byte(0));
    lcd.setCursor(0, 1);
    lcd.print("TAP YOUR TAG !");

    welcome = 1;
  }
  distanceCm = 7;
  String target;
  char UID[32] = "";

  if (digitalRead(ADMIN) == HIGH && adminopen == 0)
  {
    welcome = 0;


    lcd.clear();
    lcd.setCursor(0, 0);
    // print message
    lcd.print("ADMIN OPEN DOOR !");



    for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
      // in steps of 1 degree
      myservo.write(pos);    // tell servo to go to position in variable 'pos'
      digitalWrite(GREEN, HIGH);
      delay(15);             // waits 15ms for the servo to reach the position
    }


    adminopen = 1;


  }
  if (digitalRead(ADMIN) == HIGH && adminopen == 1)
  {
    welcome = 0;


    lcd.clear();
    lcd.setCursor(0, 0);
    // print message
    lcd.print("ADMIN CLOSE DOOR !");


    for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
      myservo.write(pos);    // tell servo to go to position in variable 'pos'
      delay(15);             // waits 15ms for the servo to reach the position
      digitalWrite(GREEN, LOW);
    }
    lcd.clear();

    adminopen = 0;

  }
  if (rfid.PICC_IsNewCardPresent() && adminopen == 0) { // new tag is available
    if (rfid.PICC_ReadCardSerial()) { // NUID has been readed
      digitalWrite(BUZZER, HIGH);
      delay(150);
      digitalWrite(BUZZER, LOW);
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("READING TAG !");

      welcome = 0;


      array_to_string(rfid.uid.uidByte, 4, UID);

      if (Firebase.ready() )
      {
        dataMillis = millis();
        String s(UID);
        String documentPath = "/users/";
        documentPath.concat(s);
        String mask = "";

        //If the document path contains space e.g. "a b c/d e f"
        //It should encode the space as %20 then the path will be "a%20b%20c/d%20e%20f"


        if (Firebase.Firestore.getDocument(&fbdo, FIREBASE_PROJECT_ID, "", documentPath.c_str(), mask.c_str()))
        {

          int indexa = fbdo.payload().indexOf("prenom") + 33;
          int indexb = fbdo.payload().indexOf('"', indexa + 1);
          String prenom = fbdo.payload().substring(indexa, indexb);
          Serial.print("Bienvenue ");
          Serial.println(prenom);
          prenom.toUpperCase();
          // set cursor to first column, first row
          lcd.clear();
          lcd.setCursor(0, 0);
          // print message
          lcd.print("WELCOME");

          // clears the display to print new message

          // set cursor to first column, second row
          lcd.setCursor(3, 1);
          lcd.print(prenom);



          for (pos = 0; pos <= 180; pos += 1) { // goes from 0 degrees to 180 degrees
            // in steps of 1 degree
            myservo.write(pos);    // tell servo to go to position in variable 'pos'
            digitalWrite(GREEN, HIGH);
            delay(15);             // waits 15ms for the servo to reach the position
          }
          while (distanceCm > 6)
          {

            // Clears the trigPin
            digitalWrite(trigPin, LOW);
            delayMicroseconds(2);
            // Sets the trigPin on HIGH state for 10 micro seconds
            digitalWrite(trigPin, HIGH);
            delayMicroseconds(10);
            digitalWrite(trigPin, LOW);

            // Reads the echoPin, returns the sound wave travel time in microseconds
            duration = pulseIn(echoPin, HIGH);

            // Calculate the distance
            distanceCm = duration * SOUND_SPEED / 2;


            delay(10);


          }
          for (pos = 180; pos >= 0; pos -= 1) { // goes from 180 degrees to 0 degrees
            myservo.write(pos);    // tell servo to go to position in variable 'pos'
            delay(15);             // waits 15ms for the servo to reach the position
            digitalWrite(GREEN, LOW);
          }
          lcd.clear();
        }
        else
        {
          digitalWrite(RED, HIGH);
          Serial.println("utilisateur n'existe pas");
          // set cursor to first column, first row
          digitalWrite(BUZZER, HIGH);
          delay(200);
          digitalWrite(BUZZER, LOW);
          delay(200);
          digitalWrite(BUZZER, HIGH);
          delay(200);
          digitalWrite(BUZZER, LOW);
          delay(200);
          digitalWrite(BUZZER, HIGH);
          delay(200);
          digitalWrite(BUZZER, LOW);
          lcd.setCursor(0, 0);
          // print message
          lcd.print("USER NOT FOUND !");
          delay(2000);
          digitalWrite(RED, LOW);
          lcd.clear();


        }


      }


      rfid.PICC_HaltA(); // halt PICC
      rfid.PCD_StopCrypto1(); // stop encryption on PCD
    }
  }










}

void array_to_string(byte array[], unsigned int len, char buffer[])
{
  for (unsigned int i = 0; i < len; i++)
  {
    byte nib1 = (array[i] >> 4) & 0x0F;
    byte nib2 = (array[i] >> 0) & 0x0F;
    buffer[i * 2 + 0] = nib1  < 0xA ? '0' + nib1  : 'A' + nib1  - 0xA;
    buffer[i * 2 + 1] = nib2  < 0xA ? '0' + nib2  : 'A' + nib2  - 0xA;
  }
  buffer[len * 2] = '\0';
}
