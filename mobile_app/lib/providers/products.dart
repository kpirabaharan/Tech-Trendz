import 'dart:convert';
import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;

import '../models/product.dart';

class Products with ChangeNotifier {
  List<Product> _products = [];
  String _category = 'all';

  List<Product> get products {
    return [..._products];
  }

  String get mode {
    return _category;
  }

  Future<void> setMode(String mode) async {
    _category = mode;
    await fetchProducts(mode);
  }

  Future<void> fetchProducts(String mode) async {
    print(mode);
    final url = Uri.parse('${dotenv.env['API_URL']}product/mobile/$mode');
    try {
      final response = await http.get(
        url,
      );
      List<Product> extractedProducts;

      final extractedData = json.decode(response.body) as List<dynamic>;

      extractedProducts = extractedData
          .map((prod) => Product(
              id: prod['_id'],
              name: prod['name'],
              brand: prod['brand'],
              cost: prod['cost'],
              description: prod['description'],
              isNew: prod['new'],
              rating: prod['rating'].toDouble(),
              category: prod['category'],
              picturePath: prod['picturePath']))
          .toList();

      _products = extractedProducts;
    } catch (err) {
      print(err);
    }
  }
}
