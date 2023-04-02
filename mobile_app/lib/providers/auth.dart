import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

import '../models/user.dart';
import '../models/cart.dart';
import '../error/http_exception.dart';

class Auth with ChangeNotifier {
  User? _user;
  String? _token;

  String? get userId {
    return _user?.id;
  }

  String? get token {
    if (_token != null) {
      return _token as String;
    }
    return null;
  }

  bool get isAuth {
    return token != null;
  }

  List<CartProducts> get cartItems {
    if (_user?.cart != null) {
      if (_user!.cart.cartProducts.isNotEmpty) {
        return [..._user!.cart.cartProducts];
      }
      return [];
    }
    return [];
  }

  int get cartLength {
    return _user!.cart.cartProducts.length;
  }

  int get totalQuantity {
    return _user!.cart.totalQuantity;
  }

  double get totalAmount {
    return _user!.cart.totalAmount;
  }

  Future<void> login(String email, String password) async {
    final url = Uri.parse('${dotenv.env['API_URL']}auth/login');

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: json.encode(
          {
            'email': email,
            'password': password,
          },
        ),
      );
      final responseData = json.decode(response.body);

      if (response.statusCode == 400) {
        throw HttpException(responseData['msg']);
      }

      _user = User(
        id: responseData['user']['_id'],
        firstName: responseData['user']['firstName'],
        lastName: responseData['user']['lastName'],
        email: responseData['user']['email'],
        phoneNumber: responseData['user']['phoneNumber'],
        dateOfBirth: responseData['user']['dateOfBirth'],
        cart: Cart(
          totalAmount: responseData['user']['cart']['totalAmount'],
          totalQuantity: responseData['user']['cart']['totalQuantity'],
          cartProducts: (responseData['user']['cart']['items'] as List)
              .map((item) => CartProducts(
                    id: item['_id'],
                    name: item['name'],
                    brand: item['brand'],
                    cost: item['cost'],
                    picturePath: item['picturePath'],
                    quantity: item['quantity'],
                  ))
              .toList(),
        ),
      );
      _token = responseData['token'];
      notifyListeners();

      final prefs = await SharedPreferences.getInstance();
      final userData = json.encode(
        {
          'token': _token,
          '_id': responseData['user']['_id'],
          'firstName': responseData['user']['firstName'],
          'lastName': responseData['user']['lastName'],
          'email': responseData['user']['email'],
          'phoneNumber': responseData['user']['phoneNumber'],
          'dateOfBirth': responseData['user']['dateOfBirth'],
          'cart': responseData['user']['cart'],
        },
      );
    } catch (err) {
      print(err);
    }
  }

  Future<bool> tryAutoLogin() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      if (!prefs.containsKey('userData')) {
        return false;
      }

      final extractedUserData =
          json.decode(prefs.getString('userData') as String) as Map<String, dynamic>;

      print(extractedUserData);

      _token = extractedUserData['token'] as String;
      _user = User(
        id: extractedUserData['_id'],
        firstName: extractedUserData['firstName'],
        lastName: extractedUserData['lastName'],
        email: extractedUserData['email'],
        phoneNumber: extractedUserData['phoneNumber'],
        dateOfBirth: extractedUserData['dateOfBirth'],
        cart: Cart(
          totalAmount: extractedUserData['cart']['totalAmount'],
          totalQuantity: extractedUserData['cart']['totalQuantity'],
          cartProducts: (extractedUserData['cart']['items'] as List)
              .map((item) => CartProducts(
                    id: item['_id'],
                    name: item['name'],
                    brand: item['brand'],
                    cost: item['cost'],
                    picturePath: item['picturePath'],
                    quantity: item['quantity'],
                  ))
              .toList(),
        ),
      );
      notifyListeners();
      return true;
    } catch (err) {
      print(err);
      return false;
    }
  }

  Future<void> register(String firstName, String lastName, String dateOfBirth, int phoneNumber,
      String email, String password) async {
    final url = Uri.parse('${dotenv.env['API_URL']}auth/register');

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: json.encode(
          {
            'firstName': firstName,
            'lastName': lastName,
            'dateOfBirth': dateOfBirth,
            'phoneNumber': phoneNumber,
            'email': email,
            'password': password,
          },
        ),
      );
      final responseData = json.decode(response.body);

      print(response.statusCode);
      print(responseData);

      if (response.statusCode == 400) {
        throw HttpException(responseData['msg']);
      }
    } catch (err) {
      print(err);
    }
  }

  Future<void> fetchCart() async {
    final url = Uri.parse('${dotenv.env['API_URL']}cart/$userId');
    try {
      final response = await http.get(
        url,
        headers: {'Authorization': 'Bearer $_token'},
      );
      final responseData = json.decode(response.body);
      print(responseData);
    } catch (err) {
      print(err);
    }
  }
}
