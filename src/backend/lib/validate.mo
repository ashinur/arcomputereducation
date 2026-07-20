import Runtime "mo:core/Runtime";

module {
  // Reject empty or oversized text inputs so untrusted client data cannot
  // pollute or bloat canister state. Traps with a descriptive message.
  public func requireText(value : Text, field : Text, minLen : Nat, maxLen : Nat) {
    let n = value.size();
    if (n < minLen) Runtime.trap(field # " is too short");
    if (n > maxLen) Runtime.trap(field # " is too long");
  };
};
