const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-foreground tracking-tighter">OWTY</h3>
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} OWTY. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
