import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

import '../models/product.dart';
import '../providers/products.dart';
import '../providers/auth.dart';
import './auth_screen.dart';
import './cart_screen.dart';
import '../widgets/mode_query.dart';
import '../widgets/carousel/product_carousel.dart';
import '../widgets/product_item.dart';

class ProductScreen extends StatefulWidget {
  const ProductScreen({super.key});

  @override
  State<ProductScreen> createState() => _ProductScreenState();
}

class _ProductScreenState extends State<ProductScreen> {
  late Future _productCarouselFuture;
  late Future _productFuture;

  late List<Product> carouselProducts = [];

  Future _obtainCarouselProductsFuture() async {
    try {
      var url = Uri.parse('${dotenv.env['API_URL']}product/carousel');
      if (Platform.isAndroid) {
        url = Uri.parse('${dotenv.env['ANDROID_API_URL']}product/carousel');
      }
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
      carouselProducts = extractedProducts;
    } catch (err) {
      print(err);
    }
  }

  Future _obtainProductsFuture() async {
    try {
      await Provider.of<Products>(context, listen: false).fetchProducts('all');
    } catch (err) {
      print(err);
    }
  }

  void _setMode(String mode) {
    setState(() {
      Provider.of<Products>(context, listen: false).setMode(mode);
    });
  }

  @override
  void initState() {
    _productCarouselFuture = _obtainCarouselProductsFuture();
    _productFuture = _obtainProductsFuture();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: Future.wait([_productCarouselFuture, _productFuture]),
      builder: (context, snapshot) => Scaffold(
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(12, 12, 0, 0),
              child: Text(
                'New Products',
                style: Theme.of(context).textTheme.titleMedium,
              ),
            ),
            SizedBox(
              height: 225,
              child: Stack(
                children: [
                  ProductCarousel(products: carouselProducts),
                  Container(
                    color: Theme.of(context).canvasColor,
                    width: 75,
                  ),
                ],
              ),
            ),
            Consumer<Products>(
                builder: (context, products, child) => ModeQuery(
                      mode: products.mode,
                      setMode: _setMode,
                    )),
            Expanded(
              child: Consumer<Products>(
                builder: (context, products, child) => Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 8.0),
                  child: GridView(
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 1 / 1,
                      crossAxisSpacing: 10,
                      mainAxisSpacing: 10,
                    ),
                    children: products.products.map((prod) => ProductItem(product: prod)).toList(),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
