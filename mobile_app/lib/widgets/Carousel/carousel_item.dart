import 'package:flutter/material.dart';

import '../../models/product.dart';

class CarouselItem extends StatelessWidget {
  final Product product;

  const CarouselItem({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Card(
          color: Colors.white,
          elevation: 16,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          child: SizedBox(
            width: 150,
            child: Container(
              height: 150,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: Image.network(
                  'http://localhost:8080/assets/${product.picturePath}',
                  errorBuilder: (context, error, stackTrace) =>
                      const Center(child: Text('Could not load Image')),
                  fit: BoxFit.contain,
                ),
              ),
            ),
          ),
        ),
        Text(product.name),
      ],
    );
  }
}
