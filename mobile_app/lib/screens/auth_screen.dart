import 'dart:math';

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
  AuthMode _isLogin = AuthMode.login;

  void _changeMode() {
    setState(() {
      if (_isLogin == AuthMode.login) {
        _isLogin = AuthMode.signup;
      } else {
        _isLogin = AuthMode.login;
      }
    });
  }

  void showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('An Error Occurred!'),
        content: Text(message),
        actions: [
          TextButton(
            child: Text('Okay'),
            onPressed: () {
              Navigator.of(ctx).pop();
            },
          )
        ],
      ),
    );
  }

  Future<void> _login(String email, String password) async {
    setState(() {
      isLoading = true;
    });
    try {
      await Provider.of<Auth>(context, listen: false).login(email, password);
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

  Future<void> _register(String firstName, String lastName, String dateOfBirth, int phoneNumber,
      String email, String password) async {
    setState(() {
      isLoading = true;
    });
    try {
      await Provider.of<Auth>(context, listen: false).login(email, password);
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

  @override
  Widget build(BuildContext context) {
    final deviceSize = MediaQuery.of(context).size;
    print('Built');
    return Scaffold(
      appBar: AppBar(
        title: const Text('Login'),
      ),
      body: Center(
        child: Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
          elevation: 8.0,
          child: Container(
              constraints: BoxConstraints(maxHeight: deviceSize.height * 0.6),
              padding: const EdgeInsets.all(16.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  AuthForm(
                    authmode: _isLogin,
                    loginFn: _login,
                    registerFn: _register,
                  ),
                  Row(
                    children: [
                      Expanded(
                        child: Divider(
                          thickness: 2,
                          indent: deviceSize.width * 0.05,
                          endIndent: deviceSize.width * 0.05,
                          color: Colors.white,
                        ),
                      ),
                      const Text(
                        "or",
                        style: TextStyle(
                          color: Colors.white,
                        ),
                      ),
                      Expanded(
                        child: Divider(
                          thickness: 2,
                          indent: deviceSize.width * 0.05,
                          endIndent: deviceSize.width * 0.05,
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                  ElevatedButton(
                      onPressed: _changeMode,
                      style: ElevatedButton.styleFrom(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12.0),
                        ),
                        minimumSize: Size(deviceSize.width * 0.90, 40),
                      ),
                      child:
                          Text(_isLogin == AuthMode.login ? 'Register Instead' : 'Login Instead')),
                ],
              )),
        ),
      ),
    );
  }
}
