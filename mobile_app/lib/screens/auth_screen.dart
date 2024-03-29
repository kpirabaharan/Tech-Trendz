import 'dart:io' show Platform, File;

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth.dart';
import '../error/http_exception.dart';
import '../widgets/auth_form.dart';

enum AuthMode { signup, login }

var isLoading = false;

class AuthScreen extends StatefulWidget {
  static const routeName = '/auth-screen';

  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  void showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('An Error Occurred!'),
        content: Text(message),
        actions: [
          TextButton(
            child: const Text('Okay'),
            onPressed: () {
              Navigator.of(ctx).pop();
            },
          )
        ],
      ),
    );
  }

  Future<void> login(String email, String password) async {
    setState(() {
      isLoading = true;
    });
    try {
      await Provider.of<Auth>(context, listen: false).login(email, password);
      Navigator.of(context).pop();
    } on HttpException catch (err) {
      var errorMessage = 'Authentication failed';
      if (err.toString().contains('User does not exist')) {
        errorMessage = 'Invalid email.';
      } else if (err.toString().contains('Invalid credentials')) {
        errorMessage = 'Invalid password.';
      }
      showErrorDialog(errorMessage);
    } catch (error) {
      const errorMessage = 'Could not authenticate you. Please try again later.';
      showErrorDialog(errorMessage);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  Future<void> register(String firstName, String lastName, String dateOfBirth, int phoneNumber,
      String email, String password) async {
    setState(() {
      isLoading = true;
    });
    try {
      await Provider.of<Auth>(context, listen: false)
          .register(firstName, lastName, dateOfBirth, phoneNumber, email, password);
    } catch (error) {
      const errorMessage = 'Could not register you. Please try again later.';
      showErrorDialog(errorMessage);
    } finally {
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final deviceSize = MediaQuery.of(context).size;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Authenticate'),
      ),
      body: Stack(
        children: [
          isLoading
              ? const Center(child: CircularProgressIndicator())
              : CustomScrollView(
                  slivers: [
                    SliverFillRemaining(
                      hasScrollBody: false,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Center(
                            child: Container(
                              width: deviceSize.width * 0.90,
                              child: AuthForm(login, register),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
        ],
      ),
    );
  }
}
