let config: any = {};

export function configuration(attr = ""): PropertyDecorator {
  return (target: any, key: string | symbol) => {
    console.log('setting decorator')
    delete target[key];
    Object.defineProperty(target, key, {
      enumerable: true,
      configurable: false,
      get: () => {
        return configuration.get(attr);
      },
    });
  };
}

configuration.set = (CONFIG: any) => {
  config = { ...config, ...CONFIG };
};

configuration.get = (attr: string) => {
  if (!attr) {
    return config;
  }

  const path = attr.split(".");
  let val = config;
  val = path.reduce((data: any, value: string) => {
    if (value in data) {
      return data[value];
    }
  }, val);

  return val;
};
