import { SiteShell, InquiryDrawer, WhatsAppCta } from "@/components/SiteShell";
import { Seo } from "@/components/Seo";
import { businessProfile } from "@/data/business";
import { contactSeo } from "@shared/seo";

export default function Contact() {
  return <SiteShell><Seo page={contactSeo} /><section className="contact-page">
    <p className="eyebrow">CONTACT TOPPERFUME</p><h1>Let’s discuss your product requirements.</h1>
    <p>{businessProfile.companyName} is a trading company supporting wholesale beauty sourcing and supplier coordination for fragrance, skincare and makeup. Custom projects are reviewed with suppliers individually; availability varies by product.</p>
    <div className="contact-details"><h2>Sales contact</h2><a href={`mailto:${businessProfile.email}`}>{businessProfile.email}</a><p>WhatsApp {businessProfile.whatsappDisplay}</p></div>
    <div className="contact-actions"><WhatsAppCta label="Discuss on WhatsApp" /><InquiryDrawer triggerLabel="Email inquiry" /></div>
    <p>Include the product, destination and estimated quantity. Listed product subtotals exclude shipping and taxes. Availability, payment and delivery terms are confirmed in the final quotation.</p>
  </section></SiteShell>;
}
