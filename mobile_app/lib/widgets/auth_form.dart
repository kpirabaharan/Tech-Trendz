import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../screens/auth_screen.dart';

// ignore: must_be_immutable
class AuthForm extends StatefulWidget {
  AuthMode authMode;
  final void Function(String email, String password) loginFn;
  final void Function(String firstName, String lastName, String dateOfBirth, int phoneNumber,
      String email, String password) registerFn;

  AuthForm(this.authMode, this.loginFn, this.registerFn, {super.key});

  @override
  State<AuthForm> createState() => _AuthFormState();
}

class _AuthFormState extends State<AuthForm> {
  var _isInit = true;
  AuthMode _authMode = AuthMode.login;
  final _formKey = GlobalKey<FormState>();
  TextEditingController dateCtl = TextEditingController();

  final Map<String, dynamic> _authData = {
    'firstName': '',
    'lastName': '',
    'dateOfBirth': null,
    'phoneNumber': 0,
    'email': '',
    'password': '',
  };

  @override
  void didChangeDependencies() {
    if (_isInit) {
      _authMode = widget.authMode;
      _isInit = false;
      super.didChangeDependencies();
    }
  }

  void _switchAuth() {
    if (_authMode == AuthMode.login) {
      setState(() {
        _authMode = AuthMode.signup;
      });
    } else {
      setState(() {
        _authMode = AuthMode.login;
      });
    }
  }

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
    setState(() {
      _authMode = AuthMode.login;
    });
    widget.registerFn(_authData['firstName']!, _authData['lastName']!, _authData['dateOfBirth']!,
        _authData['phoneNumber'], _authData['email']!, _authData['password']!);
  }

  void _presentDatePicker() {
    showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(1900),
      lastDate: DateTime.now(),
    ).then((pickedDate) {
      if (pickedDate == null) {
        return;
      }
      setState(() {
        dateCtl.text = DateFormat.yMMMd().format(pickedDate);
        _authData['dateOfBirth'] = pickedDate.toIso8601String();
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final deviceSize = MediaQuery.of(context).size;

    return Column(
      children: [
        SizedBox(
          height: deviceSize.height * 0.1,
        ),
        Card(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
          elevation: 8.0,
          child: Container(
            // height: _heightAnimation.value.height,
            constraints: BoxConstraints(maxHeight: deviceSize.height * 0.8),
            padding: const EdgeInsets.all(16.0),
            child: Form(
              key: _formKey,
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    if (_authMode == AuthMode.signup)
                      Row(
                        children: [
                          Expanded(
                            child: SizedBox(
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
                            child: SizedBox(
                              child: TextFormField(
                                decoration: InputDecoration(
                                  labelText: 'Last Name',
                                  labelStyle: Theme.of(context).textTheme.labelMedium,
                                  suffixIcon: const Icon(Icons.person),
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
                    if (_authMode == AuthMode.signup)
                      TextFormField(
                        controller: dateCtl,
                        decoration: InputDecoration(
                          labelText: 'Date-Of-Birth',
                          labelStyle: Theme.of(context).textTheme.labelMedium,
                          suffixIcon: const Icon(Icons.calendar_month),
                          suffixIconColor: Theme.of(context).iconTheme.color,
                        ),
                        keyboardType: TextInputType.datetime,
                        validator: (value) {
                          if (value!.isEmpty) {
                            return 'Invalid Date-Of-Birth';
                          }
                          return null;
                        },
                        onTap: () {
                          FocusScope.of(context).requestFocus(new FocusNode());
                          _presentDatePicker();
                        },
                      ),
                    if (_authMode == AuthMode.signup)
                      TextFormField(
                        decoration: InputDecoration(
                          labelText: 'Phone Number',
                          labelStyle: Theme.of(context).textTheme.labelMedium,
                          suffixIcon: const Icon(Icons.phone),
                          suffixIconColor: Theme.of(context).iconTheme.color,
                        ),
                        keyboardType: TextInputType.phone,
                        validator: (value) {
                          if (value!.length != 10) {
                            return 'Invalid Phone Number';
                          }
                          return null;
                        },
                        onSaved: (value) {
                          _authData['phoneNumber'] = int.parse(value!);
                        },
                      ),
                    if (_authMode == AuthMode.signup)
                      const Padding(padding: EdgeInsets.symmetric(vertical: 5)),
                    TextFormField(
                      decoration: InputDecoration(
                        labelText: 'E-Mail',
                        labelStyle: Theme.of(context).textTheme.labelMedium,
                        suffixIcon: const Icon(Icons.email),
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
                        suffixIcon: const Icon(Icons.lock),
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
                    const Padding(padding: EdgeInsets.symmetric(vertical: 5)),
                    ElevatedButton(
                      onPressed: _authMode == AuthMode.login ? _tryLogin : _tryRegister,
                      style: ElevatedButton.styleFrom(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12.0),
                        ),
                        minimumSize: Size(deviceSize.width * 0.90, 40),
                      ),
                      child: Text(_authMode == AuthMode.login ? 'LOGIN' : 'SIGN UP'),
                    ),
                    const Padding(padding: EdgeInsets.symmetric(vertical: 2.5)),
                    Row(
                      children: <Widget>[
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
                    const Padding(padding: EdgeInsets.symmetric(vertical: 2.5)),
                    ElevatedButton(
                      onPressed: _switchAuth,
                      style: ElevatedButton.styleFrom(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12.0),
                        ),
                        minimumSize: Size(deviceSize.width * 0.90, 40),
                        // backgroundColor: Theme.of(context).colorScheme.secondary,
                      ),
                      child: Text('${_authMode == AuthMode.login ? 'SIGNUP' : 'LOGIN'} INSTEAD'),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
