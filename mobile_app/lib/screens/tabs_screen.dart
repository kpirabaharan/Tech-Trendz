import 'package:flutter/material.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:provider/provider.dart';

import '../providers/auth.dart';
import './auth_screen.dart';
import './product_screen.dart';
import './cart_screen.dart';
import './orders_screen.dart';

class TabsScreen extends StatefulWidget {
  const TabsScreen({super.key});

  @override
  State<TabsScreen> createState() => _TabsScreenState();
}

class _TabsScreenState extends State<TabsScreen> {
  late List<Map<String, Object>> _pages;
  int _selectedPageIndex = 0;

  @override
  void initState() {
    _pages = [
      {
        'page': const ProductScreen(),
        'title': 'Products',
      },
      {
        'page': CartScreen(completeOrder: _goToOrders),
        'title': 'Cart',
      },
      {
        'page': const OrdersScreen(),
        'title': 'Orders',
      }
    ];
    super.initState();
  }

  @override
  void didUpdateWidget(TabsScreen oldWidget) {
    _pages = [
      {
        'page': const ProductScreen(),
        'title': 'Products',
      },
      {
        'page':  CartScreen(completeOrder: _goToOrders),
        'title': 'Cart',
      },
      {
        'page': const OrdersScreen(),
        'title': 'Orders',
      }
    ];
    super.didUpdateWidget(oldWidget);
  }

  void _selectPage(int index) {
    setState(() {
      _selectedPageIndex = index;
    });
  }

  void _goToOrders() {
    setState(() {
      _selectedPageIndex = 2;
    });
  }

  @override
  Widget build(BuildContext context) {
    final isAuth = Provider.of<Auth>(context, listen: false).isAuth;
    return Scaffold(
      appBar: AppBar(
        title: Text(_pages[_selectedPageIndex]['title'] as String),
        actions: [
          isAuth
              ? IconButton(
                  onPressed: () => Provider.of<Auth>(context, listen: false).logout(),
                  icon: const Icon(Icons.logout),
                )
              : IconButton(
                  onPressed: () => Navigator.of(context).pushNamed(AuthScreen.routeName),
                  icon: const Icon(Icons.person),
                )
        ],
      ),
      body: _pages[_selectedPageIndex]['page'] as Widget,
      bottomNavigationBar: isAuth
          ? BottomNavigationBar(
              elevation: 4,
              onTap: _selectPage,
              showUnselectedLabels: false,
              unselectedItemColor: Colors.white,
              selectedItemColor: Theme.of(context).colorScheme.secondary,
              currentIndex: _selectedPageIndex,
              type: BottomNavigationBarType.fixed,
              items: const [
                BottomNavigationBarItem(
                  icon: Icon(Icons.home),
                  label: 'Shop',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.shopping_cart),
                  label: 'Cart',
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.shopping_bag),
                  label: 'Orders',
                )
              ],
            )
          : null,
    );
  }
}
