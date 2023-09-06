import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '../../utils/theme'
import { List } from 'react-native-paper'

export default function ManageTermsScreen() {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);


  return (
    <ScrollView style={{ padding: 15, backgroundColor: theme.background, marginBottom: 10 }}>
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
      <Text style={styles.sub}>5. Intellectual Property</Text>
      <Text style={styles.body}>5.1. All content, features, and functionality of the App, including but not limited to text, graphics, logos, and images, are the property of the Company and are protected by intellectual property laws.</Text>
      <Text style={styles.body}>5.2. You may not reproduce, distribute, modify, or create derivative works of any content from the App without the Company's prior written consent.</Text>
      <Text style={styles.sub}>6. Limitation of Liability</Text>
      <Text style={styles.body}>6.1. The Company is not responsible for any direct, indirect, incidental, special, or consequential damages resulting from your use or inability to use the App.</Text>
      <Text style={styles.body}>6.2. The Company does not warrant that the App will be error-free, uninterrupted, or free from viruses or other harmful components.</Text>
      <Text style={styles.sub}>7. Termination</Text>
      <Text style={styles.body}>The Company reserves the right to terminate or suspend your account and access to the App at its discretion, without notice, for any violation of these Terms or for any other reason.</Text>
      <Text style={styles.sub}>8. Changes to Terms</Text>
      <Text style={styles.body}>The Company may modify or revise these Terms at any time. Your continued use of the App after changes are made constitutes your acceptance of the revised Terms.</Text>
      <Text style={styles.sub}>9. Contact Information</Text>
      <Text style={styles.body}>If you have any questions about these Terms, please contact us <TouchableOpacity><Text style={[styles.primary, { textDecorationLine: 'underline', marginHorizontal: 10 }]}>zeroonefour.business@gmail.com</Text></TouchableOpacity>.</Text>
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