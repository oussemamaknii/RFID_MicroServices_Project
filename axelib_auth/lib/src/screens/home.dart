import 'package:axelib_auth/src/screens/login.dart';
import 'package:axelib_auth/src/screens/widgets/main_drawer.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import 'categories_screen.dart';

class HomeScreen extends StatelessWidget {
  final auth = FirebaseAuth.instance;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Login App',
      theme: ThemeData(
        accentColor : Colors.orange,
        primarySwatch: Colors.green,
      ),
      home: CategoriesScreen(),);
   
  }
}
