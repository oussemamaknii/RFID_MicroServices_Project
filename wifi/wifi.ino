/*********
  Rui Santos
  Complete project details at https://randomnerdtutorials.com  
*********/

// Load Wi-Fi library
#include <WiFi.h>
#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN 22 // Configurable, see typical pin layout above
#define SS_PIN 5   // Configurable, see typical pin layout above
MFRC522 mfrc522(SS_PIN, RST_PIN);

// Replace with your network credentials
//const char* ssid = "Fixbox-71E048";
//const char* password = "MDI4MmNk";

//const char* ssid = "HasseneING";
//const char* password = "123333456";

const char *ssid = "COMMUNISM_BEACH";
const char *password = "OMARSI1998";

// Set web server port number to 80
WiFiServer server(80);

// Variable to store the HTTP request
String header;

// Current time
unsigned long currentTime = millis();
// Previous time
unsigned long previousTime = 0;
// Define timeout time in milliseconds (example: 2000ms = 2s)
const long timeoutTime = 2000;

void setup()
{
  Serial.begin(115200);

  SPI.begin();                       // Init SPI bus
  mfrc522.PCD_Init();                // Init MFRC522
  delay(4);                          // Optional delay. Some board do need more time after init to be ready, see Readme
  mfrc522.PCD_DumpVersionToSerial(); // Show details of PCD - MFRC522 Card Reader details
  Serial.println(F("Scan PICC to see UID, SAK, type, and data blocks..."));

  // Connect to Wi-Fi network with SSID and password
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  // Print local IP address and start web server
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  server.begin();
}

void loop()
{

  WiFiClient client = server.available(); // Listen for incoming clients
  if (!mfrc522.PICC_IsNewCardPresent())
  {
    client.println("<p>UID:  " + mfrc522.PICC_DumpUID(&(mfrc522.uid)) + "</p>");
    client.println("<p><a href=\"/UID/" + mfrc522.PICC_DumpUID(&(mfrc522.uid)) + "\"><button class=\"button\">ON</button></a></p>");
    Serial.println("nzw");
    client.println("<script>function timedRefresh(timeoutPeriod) {setTimeout(\"console.log(\"EE\");\", timeoutPeriod);}window.onload = timedRefresh(5000);</script>");
  }
  else
  {
    Serial.println("read");
    client.println("<script>function timedRefresh(timeoutPeriod) {setTimeout(\"location.reload(true);\", timeoutPeriod);}window.onload = timedRefresh(5000);</script>");
  }

  // Select one of the cards
  if (!mfrc522.PICC_ReadCardSerial())
  {
  }

  if (client)
  { // If a new client connects,
    currentTime = millis();
    previousTime = currentTime;
    Serial.println("New Client."); // print a message out in the serial port
    String currentLine = "";       // make a String to hold incoming data from the client

    while (client.connected() && currentTime - previousTime <= timeoutTime)
    { // loop while the client's connected
      currentTime = millis();
      if (client.available())
      { // if there's bytes to read from the client,

        char c = client.read(); // read a byte, then
        Serial.write(c);        // print it out the serial monitor
        header += c;
        if (c == '\n')
        { // if the byte is a newline character
          // if the current line is blank, you got two newline characters in a row.
          // that's the end of the client HTTP request, so send a response:
          if (currentLine.length() == 0)
          {
            // HTTP headers always start with a response code (e.g. HTTP/1.1 200 OK)
            // and a content-type so the client knows what's coming, then a blank line:
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println("Connection: close");
            client.println();

            // Display the HTML web page
            client.println("<!DOCTYPE html><html>");
            client.println("<head><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
            client.println("<link rel=\"icon\" href=\"data:,\">");
            // CSS to style the on/off buttons
            // Feel free to change the background-color and font-size attributes to fit your preferences
            client.println("<style>html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;}");
            client.println(".button { background-color: #4CAF50; border: none; color: white; padding: 16px 40px;");
            client.println("text-decoration: none; font-size: 30px; margin: 2px; cursor: pointer;}");
            client.println(".button2 {background-color: #555555;}</style></head>");

            // Web Page Heading
            client.println("<body><h1>ESP32 Web Server</h1>");

            client.println("</body></html>");

            // The HTTP response ends with another blank line
            client.println();
            // Break out of the while loop
            break;
          }
          else
          { // if you got a newline, then clear currentLine
            currentLine = "";
          }
        }
        else if (c != '\r')
        {                   // if you got anything else but a carriage return character,
          currentLine += c; // add it to the end of the currentLine
        }
      }
    }
    // Clear the header variable
    header = "";
    // Close the connection
    client.stop();
    Serial.println("Client disconnected.");
    Serial.println("");
  }
}
