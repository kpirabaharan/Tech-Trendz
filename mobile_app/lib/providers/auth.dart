import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
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

  List<CartProducts> get cart {
    if (_user?.cart != null) {
      if (_user!.cart.cartProducts.isNotEmpty) {
        return [..._user!.cart.cartProducts];
      }
      return [];
    }
    return [];
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
    } catch (err) {
      print(err);
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
