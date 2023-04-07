import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class CheckoutScreen extends StatelessWidget {
  final String url;

  CheckoutScreen({required this.url});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        color: Colors.white,
        padding: const EdgeInsets.only(top: 50),
        child: WebView(
          initialUrl: url,
          javascriptMode: JavascriptMode.unrestricted,
          onPageFinished: (url) {
            if (url.contains('/payment/success')) {
              return Navigator.of(context).pop('Success');
            } else if (url.contains('cart')) {
              return Navigator.of(context).pop('Fail');
            }
          },
        ),
      ),
    );
  }
}
