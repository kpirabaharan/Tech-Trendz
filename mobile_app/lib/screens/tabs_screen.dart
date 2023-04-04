import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/auth.dart';
import './product_screen.dart';
import './cart_screen.dart';
import './auth_screen.dart';

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
    setState(() {
      _pages = [
        {
          'page': const ProductScreen(),
          'title': 'Products',
        },
        {
          'page': const CartScreen(),
          'title': 'Cart',
        }
      ];
    });
    super.initState();
  }

  @override
  void didUpdateWidget(TabsScreen oldWidget) {
    setState(() {
      _pages = [
        {
          'page': const ProductScreen(),
          'title': 'Products',
        },
        {
          'page': const CartScreen(),
          'title': 'Cart',
        }
      ];
    });
    super.didUpdateWidget(oldWidget);
  }

  void _selectPage(int index) {
    print('set page');
    setState(() {
      _selectedPageIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    final isAuth = Provider.of<Auth>(context, listen: false).isAuth;
    print('Tabs Screen');
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
      bottomNavigationBar: BottomNavigationBar(
        elevation: 4,
        onTap: _selectPage,
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
          )
        ],
      ),
    );
  }
}
