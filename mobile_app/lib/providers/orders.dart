import 'package:flutter/material.dart';

import '../models/order.dart';

class Orders with ChangeNotifier {
  final String _token;
  List<Order> _orders = [];

  Orders(this._token, this._orders);

  List<Order> get orders {
    return [..._orders];
  }
}
