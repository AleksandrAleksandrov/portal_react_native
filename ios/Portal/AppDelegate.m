/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>


@implementation AppDelegate

@synthesize oneSignal = _oneSignal;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Portal"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
//  [[UIApplication sharedApplication] registerUserNotificationSettings:[UIUserNotificationSettings settingsForTypes:(UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge) categories:nil]];
//  [[UIApplication sharedApplication] registerForRemoteNotifications];


  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  // For requiring push notification permissions manually.
  self.oneSignal = [[RCTOneSignal alloc] initWithLaunchOptions:launchOptions
                                                         appId:@"7dddc775-f055-4f7b-9db3-de94b0f14a80"
                                                      settings:@{kOSSettingsKeyAutoPrompt: @false}];
  return YES;
}
// Handle remote notification registration.
//- (void)application:(UIApplication *)app
//didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)devToken {
//  NSLog(@"asddasd %@", [NSString stringWithFormat:@"%@", devToken]);
//  NSLog(@"qyweqw %@", [NSKeyedUnarchiver unarchiveObjectWithData:devToken]);
//}
//
//- (void)onOSSubscriptionChanged:(OSSubscriptionStateChanges*)stateChanges {
//
//  // Example of detecting subscribing to OneSignal
////  if (!stateChanges.from.subscribed && stateChanges.to.subscribed) {
////    NSLog(@"Subscribed for OneSignal push notifications!");
////    // get player ID
////    stateChanges.to.userId
////  }
//
//  // prints out all properties
//  NSLog(@"SubscriptionStateChanges:\n%@", stateChanges);
//}
@end
