import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../../utils/theme'

export default function ManageTermsScreen() {
  return (
    <ScrollView style={{ padding: 25, backgroundColor: theme.background }}>
      <Text style={styles.title}>Terms and Conditions for ZOFS InventoTrack App</Text>

      <Text style={styles.text}>These terms and conditions are entered into by and between you Business and ZOFS Company. These Terms govern your use of the ZOFS InventoTrack team.</Text>

      <Text style={styles.body}>

        By accessing or using the App, You agree to comply with and be bound by these Terms. If you do not agree with these Terms, please do not use the App.


      </Text>
      <Text style={styles.sub}>2. App Usage</Text>
      <Text style={styles.body}>
        2.1. The App is intended solely for managing and tracking inventory of the registared business.
      </Text>
      <Text style={styles.body}> 2.2. You agree not to use the App for any unlawful purpose or in any way that could harm the App or its users.</Text>
      <Text style={styles.sub}>3. User Registration</Text>
      <Text style={styles.body}>3.1. You may need to create an account to access certain features of the App. You are responsible for maintaining the confidentiality of your account information.</Text>
      <Text style={styles.body}>3.2. You must provide accurate and complete information when creating your account.</Text>
      <Text style={styles.sub}>4. Privacy Policy</Text>

      <Text style={styles.body}> Your use of the App is also governed by our Privacy Policy [link to the Privacy Policy], which explains how we collect, use, and protect your personal information.</Text>
      <Text style={styles.body}></Text>
      <Text style={{color: theme.primary}}>





        2.2. You agree not to use the App for any unlawful purpose or in any way that could harm the App or its users.

        **3. User Registration**

        3.1. You may need to create an account to access certain features of the App. You are responsible for maintaining the confidentiality of your account information.

        3.2. You must provide accurate and complete information when creating your account.

        **4. Privacy Policy**

        Your use of the App is also governed by our Privacy Policy [link to the Privacy Policy], which explains how we collect, use, and protect your personal information.

        **5. Intellectual Property**

        5.1. All content, features, and functionality of the App, including but not limited to text, graphics, logos, and images, are the property of the Company and are protected by intellectual property laws.

        5.2. You may not reproduce, distribute, modify, or create derivative works of any content from the App without the Company's prior written consent.

        **6. Limitation of Liability**

        6.1. The Company is not responsible for any direct, indirect, incidental, special, or consequential damages resulting from your use or inability to use the App.

        6.2. The Company does not warrant that the App will be error-free, uninterrupted, or free from viruses or other harmful components.

        **7. Termination**

        The Company reserves the right to terminate or suspend your account and access to the App at its discretion, without notice, for any violation of these Terms or for any other reason.

        **8. Changes to Terms**

        The Company may modify or revise these Terms at any time. Your continued use of the App after changes are made constitutes your acceptance of the revised Terms.

        **9. Governing Law**

        These Terms are governed by and construed in accordance with the laws of [your jurisdiction], without regard to its conflict of law principles.

        **10. Contact Information**

        If you have any questions about these Terms, please contact us at [your contact information].

        **11. Entire Agreement**

        These Terms constitute the entire agreement between you and the Company concerning your use of the App and supersede all prior or contemporaneous agreements, representations, and understandings.

        By using the App, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.

        ---

        Please note that this template is a starting point and should be customized to fit your specific app's features and legal requirements. Consult with a legal professional to ensure full compliance with relevant laws and regulations.</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 20,
    color: theme.primary
  },
  text: {
    fontSize: 15,
    color: theme.primary,
    marginBottom: 15
  },
  body: {
    color: theme.primary,
    marginBottom: 10
  },
  sub: {
    color: theme.primary,
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 15
  }
})