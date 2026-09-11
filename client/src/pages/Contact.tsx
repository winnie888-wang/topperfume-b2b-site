import { SiteShell, InquiryDrawer, WhatsAppCta } from "@/components/SiteShell";
import { Seo } from "@/components/Seo";
import { businessProfile } from "@/data/business";
import { contactSeo } from "@shared/seo";
import { dispatchGuidance, transactionGuidance } from "@shared/businessPolicy";

export default function Contact() {
  return <SiteShell><Seo page={contactSeo} /><section className="contact-page">
    <p className="eyebrow">CONTACT TOPPERFUME</p><h1>Let’s discuss your product requirements.</h1>
    <p>{businessProfile.companyName} is a trading company supporting wholesale beauty sourcing and supplier coordination for fragrance, skincare and makeup. Custom projects are reviewed with suppliers individually; availability varies by product.</p>
    <div className="contact-details"><h2>Sales contact</h2><a href={`mailto:${businessProfile.email}`}>{businessProfile.email}</a><p>WhatsApp {businessProfile.whatsappDisplay}</p></div>
    <div className="contact-actions"><WhatsAppCta label="Discuss on WhatsApp" /><InquiryDrawer triggerLabel="Email inquiry" /></div>
    <p>Include the product, destination and estimated quantity. Listed product subtotals exclude shipping and taxes.</p>
    <section id="order-terms"><h2>Estimated dispatch and order terms</h2><p>{dispatchGuidance}</p><p>{transactionGuidance}</p></section>
  </section></SiteShell>;
}
