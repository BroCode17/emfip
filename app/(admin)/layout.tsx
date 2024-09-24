
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className=" custom-scrollbar">
      {children}
    </section>
  )
}
