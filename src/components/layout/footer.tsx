export function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="border-t py-4 md:py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} Budget Tracker. All rights reserved.
          </p>
          
        </div>
      </footer>
    );
  }