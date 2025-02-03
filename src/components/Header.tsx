export const Header = () => {
    return (
      <header className="w-full py-12 mb-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-center tracking-tight">
            Solo Art Journey
          </h1>
          <div className="mt-4 max-w-2xl mx-auto">
            <div className="flex justify-center space-x-2">
              {[1, 2, 3].map((n) => (
                <span 
                  key={n} 
                  className="inline-block w-2 h-2 rounded-full bg-gray-300"
                  style={{ animationName: 'pulse', animationDuration: '2s', animationDelay: `${n * 0.2}s`, animationIterationCount: 'infinite' }}
                />
              ))}
            </div>
          </div>
        </div>
      </header>
    );
  };
  
