import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../models/product.dart';

class Products with ChangeNotifier {
  final String _token;
  List<Product> _products = [];

  Products(this._token, this._products);

  List<Product> get products {
    return [..._products];
  }

  Future<void> fetchProducts() async {
    final url = Uri.parse('http://localhost:8080/product/');
    final response = await http.get(
      url,
    );

    final extractedData = json.decode(response.body) as List<dynamic>;
    print(extractedData);
  }
}
