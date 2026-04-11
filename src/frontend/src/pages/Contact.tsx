import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { type FormEvent, useRef, useState } from "react";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "Kodaldhowa Ward No. 2, Fakiragram, Kokrajhar, Assam — 783345",
    href: "https://maps.google.com/?q=Fakiragram,Kokrajhar,Assam",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 6002880939",
    href: "tel:+916002880939",
  },
  {
    icon: Mail,
    label: "Email",
    value: "arcomputer.education0@gmail.com",
    href: "mailto:arcomputer.education0@gmail.com",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon–Sat: 9:00 AM – 6:00 PM",
    href: undefined,
  },
];

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = nameRef.current?.value.trim() ?? "";
    const phone = phoneRef.current?.value.trim() ?? "";
    const message = messageRef.current?.value.trim() ?? "";

    if (!name) {
      toast.error("Please enter your name.");
      nameRef.current?.focus();
      return;
    }
    if (!phone) {
      toast.error("Please enter your phone number.");
      phoneRef.current?.focus();
      return;
    }
    if (!message) {
      toast.error("Please write a message.");
      messageRef.current?.focus();
      return;
    }

    setSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message sent! We will contact you soon.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  }
  return (
    <div>
      <section className="bg-card border-b border-border py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display font-bold text-4xl text-foreground mb-3">
              Contact Us
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Have questions about our courses or admission process? We're here
              to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-display font-bold text-xl text-foreground mb-6">
                Get In Touch
              </h2>
              <div className="space-y-4 mb-8">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-medium mb-0.5">
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm text-foreground hover:text-primary transition-colors"
                          target={
                            href.startsWith("https") ? "_blank" : undefined
                          }
                          rel="noopener noreferrer"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-sm text-foreground">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold text-sm text-foreground mb-3">
                Follow Us
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-foreground/60 hover:bg-primary/10 hover:text-primary transition-smooth"
                  aria-label="Facebook"
                >
                  <SiFacebook size={16} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-foreground/60 hover:bg-primary/10 hover:text-primary transition-smooth"
                  aria-label="Instagram"
                >
                  <SiInstagram size={16} />
                </a>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 rounded-xl overflow-hidden border border-border bg-muted/30 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={28} className="text-primary/40 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">
                    Fakiragram, Kokrajhar, Assam
                  </p>
                  <a
                    href="https://maps.google.com/?q=Fakiragram+Kokrajhar+Assam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline mt-1 block"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-border shadow-subtle">
                <CardContent className="p-6">
                  <h2 className="font-display font-bold text-xl text-foreground mb-5">
                    Send a Message
                  </h2>
                  <form
                    className="space-y-4"
                    data-ocid="contact-form"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cname">Your Name</Label>
                        <Input
                          id="cname"
                          placeholder="Full name"
                          className="mt-1.5"
                          ref={nameRef}
                          data-ocid="contact-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cphone">Phone Number</Label>
                        <Input
                          id="cphone"
                          placeholder="+91 XXXXX XXXXX"
                          className="mt-1.5"
                          ref={phoneRef}
                          data-ocid="contact-phone"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cemail">Email Address</Label>
                      <Input
                        id="cemail"
                        type="email"
                        placeholder="your@email.com"
                        className="mt-1.5"
                        data-ocid="contact-email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="csubject">Subject</Label>
                      <Input
                        id="csubject"
                        placeholder="e.g. Course enquiry"
                        className="mt-1.5"
                        data-ocid="contact-subject"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cmessage">Message</Label>
                      <Textarea
                        id="cmessage"
                        placeholder="Write your message here..."
                        rows={5}
                        className="mt-1.5 resize-none"
                        ref={messageRef}
                        data-ocid="contact-message"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gap-2 bg-primary hover:bg-primary/90"
                      disabled={submitting}
                      data-ocid="contact-submit"
                    >
                      <Send size={15} />{" "}
                      {submitting ? "Sending…" : "Send Message"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      We typically respond within 1 business day.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
