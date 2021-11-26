
import 'package:axelib_auth/src/screens/login.dart';
import 'package:flutter/material.dart';

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Login App',
      theme: ThemeData(
        accentColor : Colors.orange,
        primarySwatch: Colors.green,
      ),
      home: LoginScreen(),
    );
  }
}