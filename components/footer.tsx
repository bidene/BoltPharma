import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="text-xl font-bold text-primary">BoltPharma</div>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">
              Votre plateforme de confiance pour l'achat de médicaments en ligne avec livraison rapide au Bénin.
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="outline">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalogue" className="text-muted-foreground hover:text-foreground">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link href="/favoris" className="text-muted-foreground hover:text-foreground">
                  Mes favoris
                </Link>
              </li>
              <li>
                <Link href="/tableau-de-bord" className="text-muted-foreground hover:text-foreground">
                  Mon compte
                </Link>
              </li>
              <li>
                <Link href="/pharmacie/tableau-de-bord" className="text-muted-foreground hover:text-foreground">
                  Espace pharmacie
                </Link>
              </li>
              <li>
                <Link href="/pharmacies" className="text-muted-foreground hover:text-foreground">
                  Nos pharmacies
                </Link>
              </li>
              <li>
                <Link href="/comment-ca-marche" className="text-muted-foreground hover:text-foreground">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-muted-foreground hover:text-foreground">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link href="/conditions-generales" className="text-muted-foreground hover:text-foreground">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-muted-foreground hover:text-foreground">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">+229 97 00 00 00</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">contact@boltpharma.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-muted-foreground">Cotonou, Bénin</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="mb-2 text-sm font-semibold">Newsletter</h4>
              <div className="flex gap-2">
                <Input placeholder="Votre email" type="email" />
                <Button>OK</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 BoltPharma. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
