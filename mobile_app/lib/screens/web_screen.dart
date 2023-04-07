import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class MyWebView extends StatelessWidget {
  final String url;

  MyWebView({required this.url});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('My Website'),
      ),
      body: WebView(
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
    );
  }
}
