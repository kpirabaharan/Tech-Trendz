import 'dart:convert';
import 'dart:io';

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

  bool get isCartEmpty {
    if (_user!.cart.cartProducts.isEmpty) {
      return true;
    }
    return false;
  }

  int get totalQuantity {
    return _user!.cart.totalQuantity;
  }

  double get totalAmount {
    return _user!.cart.totalAmount;
  }

  Future<void> login(String email, String password) async {
    var url = Uri.parse('${dotenv.env['API_URL']}auth/login');
    if (Platform.isAndroid) {
      url = Uri.parse('${dotenv.env['ANDROID_API_URL']}auth/login');
    }

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
        cart: (responseData['user']['cart']['items'] as List).isNotEmpty
            ? Cart(
                totalAmount: responseData['user']['cart']['totalAmount'],
                totalQuantity: responseData['user']['cart']['totalQuantity'],
                cartProducts: (responseData['user']['cart']['items'] as List)
                    .map((item) => CartProducts(
                          id: item['productId'],
                          name: item['name'],
                          brand: item['brand'],
                          cost: item['cost'],
                          picturePath: item['picturePath'],
                          quantity: item['quantity'],
                        ))
                    .toList(),
              )
            : Cart(cartProducts: [], totalAmount: 0, totalQuantity: 0),
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
      prefs.setString('userData', userData);
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

      _token = extractedUserData['token'] as String;
      _user = User(
        id: extractedUserData['_id'],
        firstName: extractedUserData['firstName'],
        lastName: extractedUserData['lastName'],
        email: extractedUserData['email'],
        phoneNumber: extractedUserData['phoneNumber'],
        dateOfBirth: extractedUserData['dateOfBirth'],
        cart: (extractedUserData['cart']['items'] as List).isNotEmpty
            ? Cart(
                totalAmount: extractedUserData['cart']['totalAmount'],
                totalQuantity: extractedUserData['cart']['totalQuantity'],
                cartProducts: (extractedUserData['cart']['items'] as List)
                    .map((item) => CartProducts(
                          id: item['productId'],
                          name: item['name'],
                          brand: item['brand'],
                          cost: item['cost'],
                          picturePath: item['picturePath'],
                          quantity: item['quantity'],
                        ))
                    .toList(),
              )
            : Cart(cartProducts: [], totalAmount: 0, totalQuantity: 0),
      );
      notifyListeners();
      return true;
    } catch (err) {
      print(err);
      return false;
    }
  }

  Future<void> logout() async {
    _user = null;
    _token = null;

    final prefs = await SharedPreferences.getInstance();
    prefs.clear();
    notifyListeners();
  }

  Future<void> register(String firstName, String lastName, String dateOfBirth, int phoneNumber,
      String email, String password) async {
    var url = Uri.parse('${dotenv.env['API_URL']}auth/register');
    if (Platform.isAndroid) {
      url = Uri.parse('${dotenv.env['ANDROID_API_URL']}auth/register');
    }

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

      if (response.statusCode == 400) {
        throw HttpException(responseData['msg']);
      }
    } catch (err) {
      print(err);
    }
  }

  Future<void> fetchCart() async {
    var url = Uri.parse('${dotenv.env['API_URL']}cart/$userId');
    if (Platform.isAndroid) {
      url = Uri.parse('${dotenv.env['ANDROID_API_URL']}cart/$userId');
    }
    try {
      final response = await http.get(
        url,
        headers: {'Authorization': 'Bearer $_token'},
      );

      final responseData = json.decode(response.body);

      _user = User(
        id: _user!.id,
        firstName: _user!.firstName,
        lastName: _user!.lastName,
        email: _user!.email,
        phoneNumber: _user!.phoneNumber,
        dateOfBirth: _user!.dateOfBirth,
        cart: (responseData['items'] as List).isNotEmpty
            ? Cart(
                totalAmount: responseData['totalAmount'],
                totalQuantity: responseData['totalQuantity'],
                cartProducts: (responseData['items'] as List)
                    .map((item) => CartProducts(
                          id: item['productId'],
                          name: item['name'],
                          brand: item['brand'],
                          cost: item['cost'],
                          picturePath: item['picturePath'],
                          quantity: item['quantity'],
                        ))
                    .toList(),
              )
            : Cart(cartProducts: [], totalAmount: 0, totalQuantity: 0),
      );
      notifyListeners();
    } catch (err) {
      print(err);
    }
  }

  Future<void> addToCart(String productId) async {
    var url = Uri.parse('${dotenv.env['API_URL']}cart/add');
    if (Platform.isAndroid) {
      url = Uri.parse('${dotenv.env['ANDROID_API_URL']}cart/add');
    }
    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $_token',
        },
        body: json.encode({'productId': productId, 'userId': userId}),
      );

      final responseData = json.decode(response.body);

      _user = User(
        id: _user!.id,
        firstName: _user!.firstName,
        lastName: _user!.lastName,
        email: _user!.email,
        phoneNumber: _user!.phoneNumber,
        dateOfBirth: _user!.dateOfBirth,
        cart: (responseData['items'] as List).isNotEmpty
            ? Cart(
                totalAmount: responseData['totalAmount'],
                totalQuantity: responseData['totalQuantity'],
                cartProducts: (responseData['items'] as List)
                    .map((item) => CartProducts(
                          id: item['productId'],
                          name: item['name'],
                          brand: item['brand'],
                          cost: item['cost'],
                          picturePath: item['picturePath'],
                          quantity: item['quantity'],
                        ))
                    .toList(),
              )
            : Cart(cartProducts: [], totalAmount: 0, totalQuantity: 0),
      );
      notifyListeners();
    } catch (err) {
      print(err);
    }
  }

  Future<void> removeFromCart(String productId) async {
    var url = Uri.parse('${dotenv.env['API_URL']}cart/remove');
    if (Platform.isAndroid) {
      url = Uri.parse('${dotenv.env['ANDROID_API_URL']}cart/remove');
    }
    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $_token',
        },
        body: json.encode({'productId': productId, 'userId': userId}),
      );

      final responseData = json.decode(response.body);

      _user = User(
        id: _user!.id,
        firstName: _user!.firstName,
        lastName: _user!.lastName,
        email: _user!.email,
        phoneNumber: _user!.phoneNumber,
        dateOfBirth: _user!.dateOfBirth,
        cart: (responseData['items'] as List).isNotEmpty
            ? Cart(
                totalAmount: responseData['totalAmount'],
                totalQuantity: responseData['totalQuantity'],
                cartProducts: (responseData['items'] as List)
                    .map((item) => CartProducts(
                          id: item['productId'],
                          name: item['name'],
                          brand: item['brand'],
                          cost: item['cost'],
                          picturePath: item['picturePath'],
                          quantity: item['quantity'],
                        ))
                    .toList(),
              )
            : Cart(cartProducts: [], totalAmount: 0, totalQuantity: 0),
      );
      notifyListeners();
    } catch (err) {
      print(err);
    }
  }

  Future<void> removeAllFromCart(String productId) async {
    var url = Uri.parse('${dotenv.env['API_URL']}cart/removeAll');
    if (Platform.isAndroid) {
      url = Uri.parse('${dotenv.env['ANDROID_API_URL']}cart/removeAll');
    }
    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $_token',
        },
        body: json.encode({'productId': productId, 'userId': userId}),
      );

      final responseData = json.decode(response.body);

      _user = User(
        id: _user!.id,
        firstName: _user!.firstName,
        lastName: _user!.lastName,
        email: _user!.email,
        phoneNumber: _user!.phoneNumber,
        dateOfBirth: _user!.dateOfBirth,
        cart: (responseData['items'] as List).isNotEmpty
            ? Cart(
                totalAmount: responseData['totalAmount'],
                totalQuantity: responseData['totalQuantity'],
                cartProducts: (responseData['items'] as List)
                    .map((item) => CartProducts(
                          id: item['productId'],
                          name: item['name'],
                          brand: item['brand'],
                          cost: item['cost'],
                          picturePath: item['picturePath'],
                          quantity: item['quantity'],
                        ))
                    .toList(),
              )
            : Cart(cartProducts: [], totalAmount: 0, totalQuantity: 0),
      );
      notifyListeners();
    } catch (err) {
      print(err);
    }
  }

  Future<void> clearCart() async {
    var url = Uri.parse('${dotenv.env['API_URL']}cart/clear');
    if (Platform.isAndroid) {
      url = Uri.parse('${dotenv.env['ANDROID_API_URL']}cart/clear');
    }
    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $_token',
        },
        body: json.encode({'userId': userId}),
      );

      final responseData = json.decode(response.body);

      _user = User(
        id: _user!.id,
        firstName: _user!.firstName,
        lastName: _user!.lastName,
        email: _user!.email,
        phoneNumber: _user!.phoneNumber,
        dateOfBirth: _user!.dateOfBirth,
        cart: (responseData['items'] as List).isNotEmpty
            ? Cart(
                totalAmount: responseData['totalAmount'],
                totalQuantity: responseData['totalQuantity'],
                cartProducts: (responseData['items'] as List)
                    .map((item) => CartProducts(
                          id: item['productId'],
                          name: item['name'],
                          brand: item['brand'],
                          cost: item['cost'],
                          picturePath: item['picturePath'],
                          quantity: item['quantity'],
                        ))
                    .toList(),
              )
            : Cart(cartProducts: [], totalAmount: 0, totalQuantity: 0),
      );
      notifyListeners();
    } catch (err) {
      print(err);
    }
  }
}
