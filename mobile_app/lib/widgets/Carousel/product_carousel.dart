import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';

import '../../models/product.dart';
import 'carousel_item.dart';

class ProductCarousel extends StatefulWidget {
  final List<Product> products;

  const ProductCarousel({super.key, required this.products});

  @override
  State<ProductCarousel> createState() => _ProductCarouselState();
}

class _ProductCarouselState extends State<ProductCarousel> {
  @override
  Widget build(BuildContext context) {
    print('Product carousel');
    return CarouselSlider(
      options: CarouselOptions(
        height: double.infinity,
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
      items: widget.products
          .map((prod) => Builder(
                builder: (BuildContext context) => CarouselItem(product: prod),
              ))
          .toList(),
    );
  }
}
