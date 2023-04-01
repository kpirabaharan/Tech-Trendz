import 'package:flutter/material.dart';

import '../screens/auth_screen.dart';

class AuthForm extends StatefulWidget {
  final AuthMode authmode;
  final void Function(String email, String password) loginFn;
  final void Function(String firstName, String lastName, String dateOfBirth, int phoneNumber,
      String email, String password) registerFn;

  const AuthForm(
      {super.key, required this.authmode, required this.loginFn, required this.registerFn});

  @override
  State<AuthForm> createState() => _AuthFormState();
}

class _AuthFormState extends State<AuthForm> {
  @override
  Widget build(BuildContext context) {
    final _formKey = GlobalKey<FormState>();
    final deviceSize = MediaQuery.of(context).size;

    final Map<String, String> _authData = {
      'firstName': '',
      'lastName': '',
      'dateOfBirth': '',
      'phoneNumber': '',
      'email': '',
      'password': '',
    };
    void _tryLogin() {
      if (!_formKey.currentState!.validate()) {
        return;
      }
      _formKey.currentState!.save();
      widget.loginFn(_authData['email']!, _authData['password']!);
    }

    void _tryRegister() {
      if (!_formKey.currentState!.validate()) {
        return;
      }
      _formKey.currentState!.save();

      widget.registerFn(_authData['firstName']!, _authData['lastName']!, _authData['dateOfBirth']!,
          _authData['phoneNumber'] as int, _authData['email']!, _authData['password']!);
    }

    return Form(
      key: _formKey,
      child: SingleChildScrollView(
        child: Column(
          children: [
            if (widget.authmode == AuthMode.signup)
              Row(
                children: [
                  Expanded(
                    child: Container(
                      child: TextFormField(
                        decoration: InputDecoration(
                          labelText: 'First Name',
                          labelStyle: Theme.of(context).textTheme.labelMedium,
                        ),
                        keyboardType: TextInputType.name,
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Invalid Name';
                          }
                          return null;
                        },
                        onSaved: (value) {
                          _authData['firstName'] = value!;
                        },
                      ),
                    ),
                  ),
                  Expanded(
                    child: Container(
                      child: TextFormField(
                        decoration: InputDecoration(
                          labelText: 'Last Name',
                          labelStyle: Theme.of(context).textTheme.labelMedium,
                          suffixIcon: Icon(Icons.person),
                          suffixIconColor: Theme.of(context).iconTheme.color,
                        ),
                        keyboardType: TextInputType.name,
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Invalid Name';
                          }
                          return null;
                        },
                        onSaved: (value) {
                          _authData['lastName'] = value!;
                        },
                      ),
                    ),
                  ),
                ],
              ),
            if (widget.authmode == AuthMode.signup)
              TextFormField(
                decoration: InputDecoration(
                  labelText: 'Location',
                  labelStyle: Theme.of(context).textTheme.labelMedium,
                  suffixIcon: Icon(
                    Icons.location_on,
                  ),
                  suffixIconColor: Theme.of(context).iconTheme.color,
                ),
                keyboardType: TextInputType.streetAddress,
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Invalid Location';
                  }
                  return null;
                },
                onSaved: (value) {
                  _authData['location'] = value!;
                },
              ),
            if (widget.authmode == AuthMode.signup)
              TextFormField(
                decoration: InputDecoration(
                  labelText: 'Occupation',
                  labelStyle: Theme.of(context).textTheme.labelMedium,
                  suffixIcon: Icon(Icons.work),
                  suffixIconColor: Theme.of(context).iconTheme.color,
                ),
                keyboardType: TextInputType.text,
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Invalid Occupation';
                  }
                  return null;
                },
                onSaved: (value) {
                  _authData['occupation'] = value!;
                },
              ),
            TextFormField(
              decoration: InputDecoration(
                labelText: 'E-Mail',
                labelStyle: Theme.of(context).textTheme.labelMedium,
                suffixIcon: Icon(Icons.email),
                suffixIconColor: Theme.of(context).iconTheme.color,
              ),
              keyboardType: TextInputType.emailAddress,
              validator: (value) {
                if (value!.isEmpty || !value.contains('@')) {
                  return 'Invalid email!';
                }
                return null;
              },
              onSaved: (value) {
                _authData['email'] = value!;
              },
            ),
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Password',
                labelStyle: Theme.of(context).textTheme.labelMedium,
                suffixIcon: Icon(Icons.lock),
                suffixIconColor: Theme.of(context).iconTheme.color,
              ),
              obscureText: true,
              keyboardType: TextInputType.visiblePassword,
              validator: (value) {
                if (value!.isEmpty) {
                  return 'Invalid password!';
                }
                return null;
              },
              onSaved: (value) {
                _authData['password'] = value!;
              },
            ),
            Padding(padding: EdgeInsets.symmetric(vertical: 5)),
            ElevatedButton(
              onPressed: widget.authmode == AuthMode.login ? _tryLogin : _tryRegister,
              style: ElevatedButton.styleFrom(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12.0),
                ),
                minimumSize: Size(deviceSize.width * 0.90, 40),
              ),
              child: Text(widget.authmode == AuthMode.login ? 'LOGIN' : 'SIGN UP'),
            ),
          ],
        ),
      ),
    );
  }
}
