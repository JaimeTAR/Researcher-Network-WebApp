const Footer = () => {
  return (
    <footer className="border-t border-gray-700 bg-gray-800 py-4">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <p className="text-sm text-gray-400">
            © 2025 Researcher Network WebApp. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-orange-500">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500">
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
