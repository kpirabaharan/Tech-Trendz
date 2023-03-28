import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import '../../models/product.dart';
import 'carousel_item.dart';

class ProductCarousel extends StatefulWidget {
  const ProductCarousel({super.key});

  @override
  State<ProductCarousel> createState() => _ProductCarouselState();
}

class _ProductCarouselState extends State<ProductCarousel> {
  late Future _productCarouselFuture;
  late List<Product> products = [];

  Future _obtainCarouselProductsFuture() async {
    try {
      final url = Uri.parse('http://localhost:8080/product/carousel');
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
      products = extractedProducts;
    } catch (err) {
      print(err);
    }
  }

  @override
  void initState() {
    _productCarouselFuture = _obtainCarouselProductsFuture();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: _productCarouselFuture,
      builder: (ctx, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else {
          if (snapshot.error != null) {
            return const Center(child: Text('An Error Occured!'));
          } else {
            return SizedBox(
              height: 200,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.all(8),
                itemCount: products.length,
                separatorBuilder: (context, index) => const SizedBox(
                  width: 8,
                ),
                itemBuilder: (context, index) => CarouselItem(product: products[index]),
              ),
            );
          }
        }
      },
    );
  }
}
