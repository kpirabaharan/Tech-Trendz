import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:carousel_slider/carousel_slider.dart';

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
      final url = Uri.parse('${dotenv.env['API_URL']}product/carousel');
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
            return CarouselSlider(
              options: CarouselOptions(
                height: 250,
                viewportFraction: 0.6,
                enableInfiniteScroll: true,
                reverse: false,
                autoPlay: true,
                autoPlayInterval: const Duration(milliseconds: 4000),
                autoPlayAnimationDuration: const Duration(milliseconds: 1500),
                autoPlayCurve: Curves.fastOutSlowIn,
                enlargeCenterPage: true,
                enlargeFactor: 0.5,
              ),
              items: products
                  .map((prod) => Builder(
                        builder: (BuildContext context) => CarouselItem(product: prod),
                      ))
                  .toList(),
            );
          }
        }
      },
    );
  }
}
