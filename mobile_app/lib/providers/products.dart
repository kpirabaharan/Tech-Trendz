import 'dart:convert';
import 'dart:io';

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
    var url = Uri.parse('${dotenv.env['API_URL']}product/mobile/$mode');
    if (Platform.isAndroid) {
      url = Uri.parse('${dotenv.env['ANDROID_API_URL']}product/mobile/$mode');
    }
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
      notifyListeners();
    } catch (err) {
      print(err);
    }
  }
}
