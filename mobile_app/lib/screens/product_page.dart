import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

import '../models/product.dart';
import '../providers/products.dart';
import '../widgets/Carousel/product_carousel.dart';
import '../widgets/Carousel/carousel_item.dart';
import '../widgets/mode_query.dart';

class ProductPage extends StatefulWidget {
  const ProductPage({super.key});

  @override
  State<ProductPage> createState() => _ProductPageState();
}

class _ProductPageState extends State<ProductPage> {
  late Future _productCarouselFuture;
  late Future _productFuture;

  late List<Product> carouselProducts = [];

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
    print('Rebuilt');
    return FutureBuilder(
      future: Future.wait([_productCarouselFuture, _productFuture]),
      builder: (context, snapshot) => Scaffold(
        appBar: AppBar(
          title: Text('Products'),
          actions: [
            IconButton(
              onPressed: () => {},
              icon: Icon(Icons.person),
            ),
            IconButton(
              onPressed: () => {},
              icon: Icon(Icons.shopping_cart),
            ),
          ],
        ),
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(12, 12, 0, 0),
              child: Text(
                'New Products',
                style: Theme.of(context).textTheme.headlineMedium,
              ),
            ),
            Expanded(
              flex: 2,
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
              flex: 5,
              child: Card(
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                child: Consumer<Products>(
                  builder: (context, products, child) => GridView(
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 1 / 1,
                      crossAxisSpacing: 10,
                      mainAxisSpacing: 10,
                    ),
                    children: products.products
                        .map(
                          (prod) => CarouselItem(product: prod) as Widget,
                        )
                        .toList(),
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
