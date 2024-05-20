import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <main className="flex justify-between font-inter">
      {children}
      <div className="auth-asset">
        <div>
          <Image 
          alt="Auth image" 
          loading="lazy" 
          width={500} 
          height={500} 
          decoding="async"   
          src="/icons/auth-image.svg"/>
        </div>
      </div>
    </main>
  );
}
