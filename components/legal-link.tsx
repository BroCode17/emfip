'use client'
import { PrivacyPolicy, TermsOfService } from '@/lib'
import { useState } from 'react'
import LegalModal from './legal-modal'


const termsOfService: TermsOfService = {
  id: '1',
  version: '2.0',
  lastUpdated: new Date('2024-09-14'),
  acceptanceClause: 'By using our website, you agree to these terms.',
  userObligations: [
    'Provide accurate information',
    'Use the website legally',
    'Protect your account information'
  ],
  intellectualPropertyRights: 'All content on this website is our property.',
  productDescriptions: 'We strive to describe our products accurately.',
  pricingAndPayment: 'Prices are subject to change without notice.',
  shippingAndDelivery: 'Shipping times may vary based on location.',
  returnsAndRefunds: 'Returns are accepted within 30 days of purchase.',
  limitationOfLiability: 'We are not liable for any damages arising from the use of our products.',
  disputeResolution: 'Any disputes will be resolved through arbitration.',
  terminationClause: 'We reserve the right to terminate accounts at our discretion.',
  governingLaw: 'These terms are governed by the laws of Wyoming.',
  contactInformation: {
    email: 'emfip@proton.me',
    address: '30 N Gould St Ste R Sheridan, WY, 82801'
  }
}

const privacyPolicy: PrivacyPolicy = {
  id: '1',
  version: '1.0',
  lastUpdated: new Date('2024-09-14'),
  introductionStatement: 'This policy describes how we handle your personal information.',
  dataCollected: [
    'Name',
    'Email address',
    'Shipping address',
  ],
  dataUsage: [
    'Process your orders',
    'Communicate with you about your orders',
    'Improve our services'
  ],
  dataSharing: ['We do not sell your personal information.'],
  cookiesPolicy: 'We use cookies to improve your browsing experience.',
  userRights: [
    'Right to access your data',
    'Right to correct your data',
    'Right to delete your data'
  ],
  dataRetention: 'We retain your data for as long as necessary to provide our services.',
  dataProtectionMeasures: 'We use industry-standard security measures to protect your data.',
  thirdPartyLinks: 'Our website may contain links to third-party websites.',
  childrenPrivacy: 'Our services are not intended for children under 13.',
  policyChanges: 'We may update this policy from time to time.',
  contactInformation: {
    email: 'privacy@example.com',
    address: '123 E-commerce St, Web City, 12345'
  }
}

export default function LegalLinks() {
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false)

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => setIsTermsOpen(true)}
        className="text-xs hover:underline underline-offset-4"
      >
        Terms of Service
      </button>
      <button
        onClick={() => setIsPrivacyOpen(true)}
      className="text-xs hover:underline underline-offset-4"
      >
        Privacy Policy
      </button>

      <LegalModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        content={termsOfService}
        type="terms"
      />

      <LegalModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        content={privacyPolicy}
        type="privacy"
      />
    </div>
  )
}