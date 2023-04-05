import '../models/product.dart';

class ProductArguments {
  final bool isCarousel;
  final Product product;

  ProductArguments({required this.isCarousel, required this.product});
}
