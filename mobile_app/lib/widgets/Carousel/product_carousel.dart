import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';

import '../../models/product.dart';
import 'carousel_item.dart';

class ProductCarousel extends StatelessWidget {
  final List<Product> products;
  
  const ProductCarousel({super.key, required this.products});

  @override
  Widget build(BuildContext context) {
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
