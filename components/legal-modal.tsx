'use client'

import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react'
import { Fragment } from 'react'

import { X } from 'lucide-react'
import { PrivacyPolicy, TermsOfService } from '@/lib'

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  content: TermsOfService | PrivacyPolicy
  type: 'terms' | 'privacy'
}

export default function LegalModal({ isOpen, onClose, content, type }: LegalModalProps) {
  const title = type === 'terms' ? 'Terms of Service' : 'Privacy Policy'

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/55" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto custom-scrollbar">
          <div className="flex min-h-full items-center justify-center p-4 text-center custom-scrollbar">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all custom-scrollbar">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center custom-scrollbar"
                >
                  {title}
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </DialogTitle>
                <div className="mt-2 max-h-[70vh] overflow-y-auto">
                  {type === 'terms' ? (
                    <TermsContent terms={content as TermsOfService} />
                  ) : (
                    <PrivacyContent privacy={content as PrivacyPolicy} />
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

function TermsContent({ terms }: { terms: TermsOfService }) {
  return (
    <div className="space-y-4">
      <p>Version: {terms.version} (Last updated: {terms.lastUpdated.toDateString()})</p>
      <section>
        <h4 className="font-semibold">Acceptance of Terms</h4>
        <p>{terms.acceptanceClause}</p>
      </section>
      <section>
        <h4 className="font-semibold">User Obligations</h4>
        <ul className="list-disc pl-5">
          {terms.userObligations.map((obligation, index) => (
            <li key={index}>{obligation}</li>
          ))}
        </ul>
      </section>
      
      <section>
      <h4 className="font-semibold">Intellectual Property Rights</h4>
      <p>{terms.intellectualPropertyRights}</p>
      </section>
      
      <section>
      <h4 className="font-semibold">Product Descriptions</h4>
      <p>{terms.productDescriptions}</p>
      </section>
      
      <section>
      <h4 className="font-semibold">Pricing And Payment</h4>
      <p>{terms.pricingAndPayment}</p>
      </section>
      
      <section>
      <h4 className="font-semibold">Shipping And Delivery</h4>
      <p>{terms.shippingAndDelivery}</p>
      </section>
      
      <section>
      <h4 className="font-semibold">Returns And Refunds</h4>
      <p>{terms.returnsAndRefunds}</p>
      </section>
      
      <section>
      <h4 className="font-semibold">Limitation Of Liability</h4>
      <p>{terms.limitationOfLiability}</p>
      </section>
      
      <section>
      <h4 className="font-semibold">Dispute Resolution</h4>
      <p>{terms.disputeResolution}</p>
      </section>
      
      <section>
      <h4 className="font-semibold">Governing Law</h4>
      <p>{terms.governingLaw}</p>
      </section>
      
      <section>
      <h4 className="font-semibold">Contact Information</h4>
      <p>{terms.contactInformation.email}</p>
      <p>{terms.contactInformation.address}</p>
      </section>
    </div>
  )
}

function PrivacyContent({ privacy }: { privacy: PrivacyPolicy }) {
  return (
    <div className="space-y-4">
      <p>Version: {privacy.version} (Last updated: {privacy.lastUpdated.toDateString()})</p>
      <section>
        <h4 className="font-semibold">Introduction</h4>
        <p>{privacy.introductionStatement}</p>
      </section>
      <section>
        <h4 className="font-semibold">Data Collected</h4>
        <ul className="list-disc pl-5">
          {privacy.dataCollected.map((data, index) => (
            <li key={index}>{data}</li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="font-semibold">Data Usage</h4>
        <ul className="list-disc pl-5">
          {privacy.dataUsage.map((data, index) => (
            <li key={index}>{data}</li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="font-semibold">Data Sharing</h4>
        <ul className="list-disc pl-5">
          {privacy.dataSharing.map((data, index) => (
            <li key={index}>{data}</li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="font-semibold">User Rights</h4>
        <ul className="list-disc pl-5">
          {privacy.userRights.map((data, index) => (
            <li key={index}>{data}</li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className="font-semibold">Data Rentention</h4>
        <p>{privacy.dataRetention}</p>
      </section>
      <section>
        <h4 className="font-semibold">Data Protection Measures</h4>
        <p>{privacy.dataProtectionMeasures}</p>
      </section>
      <section>
        <h4 className="font-semibold">Third PartyLinks</h4>
        <p>{privacy.thirdPartyLinks}</p>
      </section>
      <section>
        <h4 className="font-semibold">Children Privacy</h4>
        <p>{privacy.childrenPrivacy}</p>
      </section>
      <section>
        <h4 className="font-semibold">Policy Changes</h4>
        <p>{privacy.policyChanges}</p>
      </section>
      <section>
      <h4 className="font-semibold">Contact Information</h4>
      <p>{privacy.contactInformation.email}</p>
      <p>{privacy.contactInformation.address}</p>
      </section>
  
    </div>
  )
}