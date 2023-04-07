import 'dart:io';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

import '../models/order.dart';

class Orders with ChangeNotifier {
  final String _token;
  List<Order> _orders = [];

  Orders(this._token, this._orders);

  List<Order> get orders {
    return [..._orders];
  }

  Future<String> postOrder(String userId) async {
    var url = Uri.parse('${dotenv.env['API_URL']}order/');
    if (Platform.isAndroid) {
      url = Uri.parse('${dotenv.env['ANDROID_API_URL']}order/');
    }
    try {
      final response = await http.post(
        url,
        headers: {
          'Authorization': 'Bearer $_token',
          'Content-Type': 'application/json',
        },
        body: json.encode(
          {'userId': userId},
        ),
      );

      return json.decode(response.body)['url'];
    } catch (err) {
      print(err);
      return "Error";
    }
  }

  Future<void> fetchOrders(String userId) async {
    var url = Uri.parse('${dotenv.env['API_URL']}order/$userId');
    if (Platform.isAndroid) {
      url = Uri.parse('${dotenv.env['ANDROID_API_URL']}order/$userId');
    }
    try {
      final response = await http.get(
        url,
        headers: {'Authorization': 'Bearer $_token'},
      );

      List<Order> _extractedOrders;

      final responseData = json.decode(response.body);

      _extractedOrders = (responseData['orders'] as List)
          .map(
            (order) => Order(
                id: order['orderId'],
                firstName: order['orderFirstName'],
                lastName: order['orderLastName'],
                orderDate: order['orderDate'],
                deliveryDate: order['deliveryDate'],
                totalQuantity: order['totalQuantity'],
                totalAmount: order['totalAmount'],
                orderProducts: (order['products'] as List)
                    .map((prod) => OrderProducts(
                          id: prod['productId'],
                          name: prod['name'],
                          brand: prod['brand'],
                          picturePath: prod['picturePath'],
                          cost: prod['cost'],
                          quantity: prod['quantity'],
                        ))
                    .toList()),
          )
          .toList();
      _orders = _extractedOrders;
      notifyListeners();
    } catch (err) {
      print(err);
    }
  }
}
