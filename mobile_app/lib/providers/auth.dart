import 'package:flutter/material.dart';

import '../models/user.dart';
import '../models/cart.dart';

class Auth with ChangeNotifier {
  User? _user;
  String? _token;

  String? get userId {
    return _user!.id;
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
}
