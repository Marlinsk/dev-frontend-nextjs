import { Layout } from '@/modules/products/ui/layouts'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      {children}
    </Layout>
  )
}