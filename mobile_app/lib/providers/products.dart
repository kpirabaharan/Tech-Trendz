import 'package:flutter/material.dart';

import '../models/product.dart';

class Products with ChangeNotifier {
  final String _token;
  List<Product> _products = [];

  Products(this._token, this._products);

  List<Product> get products {
    return [..._products];
  }
}
