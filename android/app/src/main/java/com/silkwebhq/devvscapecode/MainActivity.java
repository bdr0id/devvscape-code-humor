package com.silkwebhq.devvscapecode;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.google.firebase.analytics.FirebaseAnalytics;

public class MainActivity extends BridgeActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    FirebaseAnalytics mFirebaseAnalytics = FirebaseAnalytics.getInstance(this);
  }

}
